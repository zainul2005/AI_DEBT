import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.negotiation_email import NegotiationEmailService


class NegotiationEmailServiceTests(unittest.TestCase):
    def test_generate_email_contains_required_details(self):
        service = NegotiationEmailService()
        result = service.generate(
            borrower_name='Ava Martinez',
            bank='Northstar Bank',
            loan='Personal Loan',
            settlement_amount=7500,
            reason='temporary income disruption after a medical event',
        )

        self.assertIn('Ava Martinez', result['body'])
        self.assertIn('Northstar Bank', result['body'])
        self.assertIn('7500', result['body'])
        self.assertIn('settlement', result['body'].lower())


if __name__ == '__main__':
    unittest.main()
