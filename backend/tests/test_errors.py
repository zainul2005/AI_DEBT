import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.errors import error_response


class ErrorHandlingTests(unittest.TestCase):
    def test_error_response_contains_standard_shape(self):
        payload = error_response(404, 'Not found')
        self.assertFalse(payload['success'])
        self.assertEqual(payload['error']['status_code'], 404)
        self.assertEqual(payload['error']['message'], 'Not found')


if __name__ == '__main__':
    unittest.main()
