import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.ai_helper import GeminiAIHelper


class GeminiAIHelperTests(unittest.TestCase):
    def test_missing_key_raises_value_error(self):
        helper = GeminiAIHelper(api_key='')
        with self.assertRaises(ValueError):
            helper.generate('hello')


if __name__ == '__main__':
    unittest.main()
