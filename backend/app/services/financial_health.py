from typing import Dict, List


class FinancialHealthService:
    def analyze(self, monthly_income: float, monthly_expenses: float, loans: List[Dict[str, float]]) -> Dict[str, object]:
        monthly_surplus = monthly_income - monthly_expenses
        total_outstanding = sum(float(loan.get('outstanding', 0)) for loan in loans)
        debt_ratio = round((total_outstanding / max(monthly_income, 1)) * 100, 1) if monthly_income else 0.0
        health_score = max(0, min(100, 100 - int(debt_ratio * 0.7) + int(monthly_surplus / max(monthly_income, 1) * 30)))
        stress_level = 'High' if health_score < 45 else 'Moderate' if health_score < 75 else 'Low'
        suggestions = [
            'Increase surplus by trimming non-essential monthly spending.',
            'Prioritize loans with the highest interest rates.',
            'Maintain a reserve to avoid missing future EMI payments.'
        ]
        return {
            'monthly_surplus': round(monthly_surplus, 2),
            'debt_ratio': debt_ratio,
            'health_score': health_score,
            'stress_level': stress_level,
            'suggestions': suggestions,
            'total_outstanding': round(total_outstanding, 2),
            'chart_series': [max(0, health_score - 10), health_score, min(100, health_score + 8)]
        }
