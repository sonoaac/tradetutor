"""add simcash_balance to portfolio

Revision ID: e5c3a7b2f1d8
Revises: d4b2f1a9c8aa
Create Date: 2026-03-09

"""
from alembic import op
import sqlalchemy as sa

revision = 'e5c3a7b2f1d8'
down_revision = 'd4b2f1a9c8aa'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('portfolios',
        sa.Column('simcash_balance', sa.Integer(), nullable=False, server_default='0')
    )


def downgrade():
    op.drop_column('portfolios', 'simcash_balance')
