import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.services.settlement_prediction import SettlementPredictionService


class SettlementPredictionServiceTests(unittest.TestCase):
    def test_predict_returns_reasonable_values(self):
        service = SettlementPredictionService()
        result = service.predict(
            outstanding_loan=18000,
            monthly_income=4200,
            monthly_expenses=2200,
            emi=1200,
            lump_sum=3000,
        )

        self.assertGreaterEqual(result['settlement_percentage'], 25)
        self.assertLessEqual(result['settlement_percentage'], 70)
        self.assertGreater(result['savings'], 0)
        self.assertIn('settlement', result['recommendation'].lower())
        self.assertIn('negotiation', result['negotiation_advice'].lower())


if __name__ == '__main__':
    unittest.main()
