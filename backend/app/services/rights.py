from typing import Dict, List


class BorrowerRightsService:
    def __init__(self):
        self.items = [
            {
                'id': 1,
                'category': 'RBI Guidelines',
                'title': 'Written Notice Before Recovery',
                'summary': 'Lenders should provide clear notice and a chance to respond before initiating harsh recovery steps.',
            },
            {
                'id': 2,
                'category': 'Legal Rights',
                'title': 'Right to Ask for Documentation',
                'summary': 'Borrowers can request proof of the outstanding balance, fees, and legal basis for collection.',
            },
            {
                'id': 3,
                'category': 'Consumer Protection',
                'title': 'Protection Against Harassment',
                'summary': 'Recovery agents must avoid abusive calls, threats, and contact at unreasonable hours.',
            },
            {
                'id': 4,
                'category': 'Recovery Rules',
                'title': 'Notice of Settlement Offer',
                'summary': 'Any settlement or repayment plan should be communicated in writing and documented clearly.',
            },
            {
                'id': 5,
                'category': 'FAQs',
                'title': 'Can I dispute a charge?',
                'summary': 'Yes, you can ask for an itemized statement and dispute any incorrect or duplicate charges.',
            },
        ]

    def get_rights(self, search: str = '', category: str = '') -> Dict[str, object]:
        filtered = self.items
        query = search.strip().lower()
        if query:
            tokens = [token for token in query.split() if token]
            filtered = [
                item
                for item in filtered
                if any(token in item['title'].lower() or token in item['summary'].lower() or token in item['category'].lower() for token in tokens)
            ]
        if category:
            filtered = [item for item in filtered if item['category'] == category]
        return {
            'items': filtered,
            'categories': ['RBI Guidelines', 'Legal Rights', 'Consumer Protection', 'Recovery Rules', 'FAQs'],
        }
