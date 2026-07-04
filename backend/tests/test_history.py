import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.history import HistoryService


class HistoryServiceTests(unittest.TestCase):
    def test_create_and_list_history(self):
        service = HistoryService()
        created = service.create_history(
            record_type='settlement',
            title='Settlement Review',
            description='Generated a negotiation option',
            status='completed',
        )

        self.assertEqual(created['record_type'], 'settlement')
        items = service.list_history(page=1, page_size=10, search='Settlement')
        self.assertGreaterEqual(len(items['items']), 1)


if __name__ == '__main__':
    unittest.main()
