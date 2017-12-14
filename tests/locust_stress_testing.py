import os
import uuid
from locust import HttpLocust, TaskSet, task


"""
Locust.io stress/load/performance testing (testing RPS, Nginx rate limit etc.)
"""


class UserBehavior(TaskSet):

    test_data = {
        'test_header1': 'country',
        'dataType': '.csv',
        'delimiter': 'comma',
        'numRows': 50
    }

    @task(10)
    def index(self):
        self.client.get('/', verify=False)

    @task
    def verify(self):
        with self.client.get('/verify?uid={}'.format(uuid.uuid4().hex),
                             verify=False, catch_response=True) as response:
            if response.status_code != 429:
                response.faliure('Not hitting rate limit')
            else:
                response.success()

    @task
    def generate(self):
        with self.client.post('/generate'.format(uuid.uuid4().hex), verify=False, data=self.test_data,
                              cookies=os.environ.get('TEST_COOKIE'), catch_response=True) as response:
            if response.status_code != 429:
                response.faliure('Not hitting rate limit')
            else:
                response.success()


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000

