from typing import Dict, Optional

from app.ai_helper import GeminiAIHelper


class SettlementPredictionService:
    def __init__(self, gemini_client: Optional[object] = None):
        self.gemini_client = gemini_client or GeminiAIHelper()

    def _fallback_recommendation(self, settlement_percentage: int, savings: int, monthly_capacity: int) -> Dict[str, object]:
        if settlement_percentage >= 60:
            advice = 'You appear to have a strong negotiation position. Present a lump-sum offer that reflects your repayment capacity and ask for a significant reduction through negotiation.'
            recommendation = 'Prioritize a single structured settlement offer and ask for a waiver of fees to maximize savings.'
        elif settlement_percentage >= 45:
            advice = 'You have a moderate position. Offer a realistic lump sum and request a short payoff window to improve leverage during negotiation.'
            recommendation = 'Use a one-time lump sum plus a clear hardship explanation to improve chances of a favorable settlement.'
        else:
            advice = 'Your cash flow is tight, so frame the request as a hardship case and propose a phased settlement plan during negotiation.'
            recommendation = 'Consider a lower initial offer and negotiate for reduced penalties or a payment extension while preserving settlement intent.'

        return {
            'settlement_percentage': settlement_percentage,
            'negotiation_advice': advice,
            'savings': savings,
            'recommendation': recommendation,
            'monthly_capacity': monthly_capacity,
            'source': 'fallback'
        }

    def predict(self, outstanding_loan: float, monthly_income: float, monthly_expenses: float, emi: float, lump_sum: float) -> Dict[str, object]:
        available_cash = max(0.0, monthly_income - monthly_expenses - emi)
        debt_load = outstanding_loan / max(monthly_income, 1)
        leverage_score = min(100, max(20, int((available_cash / max(outstanding_loan, 1)) * 1000) + int((lump_sum / max(outstanding_loan, 1)) * 100)))
        settlement_percentage = max(25, min(70, int((leverage_score * 0.55) + (debt_load < 4) * 5)))
        monthly_capacity = max(0, int(available_cash + (lump_sum / 6)))
        savings = max(0, int(outstanding_loan * (settlement_percentage / 100)))

        if self.gemini_client:
            try:
                ai_advice = self.gemini_client.generate(
                    f"Generate concise settlement negotiation advice for a debtor with outstanding loan {outstanding_loan}, monthly income {monthly_income}, expenses {monthly_expenses}, EMI {emi}, and lump sum {lump_sum}."
                )
                return {
                    'settlement_percentage': settlement_percentage,
                    'negotiation_advice': ai_advice,
                    'savings': savings,
                    'recommendation': 'Use the AI guidance to negotiate a structured settlement that preserves cash flow and lowers total liability.',
                    'monthly_capacity': monthly_capacity,
                    'source': 'gemini'
                }
            except (TimeoutError, ValueError, RuntimeError):
                pass

        return self._fallback_recommendation(settlement_percentage, savings, monthly_capacity)
