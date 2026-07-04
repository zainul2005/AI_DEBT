import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.rights import BorrowerRightsService


class BorrowerRightsServiceTests(unittest.TestCase):
    def test_filter_and_search_return_expected_items(self):
        service = BorrowerRightsService()
        result = service.get_rights(search='written notice', category='Recovery Rules')

        self.assertGreaterEqual(len(result['items']), 1)
        self.assertEqual(result['items'][0]['category'], 'Recovery Rules')
        self.assertIn('notice', result['items'][0]['title'].lower())


if __name__ == '__main__':
    unittest.main()
