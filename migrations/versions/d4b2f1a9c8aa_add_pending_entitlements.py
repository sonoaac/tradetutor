"""add pending entitlements

Revision ID: d4b2f1a9c8aa
Revises: c2f6e8a1d9c1
Create Date: 2026-02-10 00:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4b2f1a9c8aa'
down_revision = 'c2f6e8a1d9c1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'pending_entitlements',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('plan', sa.String(length=20), nullable=False),
        sa.Column('provider', sa.String(length=20), nullable=False, server_default='stripe'),
        sa.Column('provider_subscription_id', sa.String(length=255), nullable=True),
        sa.Column('provider_customer_id', sa.String(length=255), nullable=True),
        sa.Column('current_period_end', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )

    op.create_index('ix_pending_entitlements_email', 'pending_entitlements', ['email'], unique=True)
    op.create_index('ix_pending_entitlements_provider_subscription_id', 'pending_entitlements', ['provider_subscription_id'], unique=False)
    op.create_index('ix_pending_entitlements_provider_customer_id', 'pending_entitlements', ['provider_customer_id'], unique=False)


def downgrade():
    op.drop_index('ix_pending_entitlements_provider_customer_id', table_name='pending_entitlements')
    op.drop_index('ix_pending_entitlements_provider_subscription_id', table_name='pending_entitlements')
    op.drop_index('ix_pending_entitlements_email', table_name='pending_entitlements')
    op.drop_table('pending_entitlements')
