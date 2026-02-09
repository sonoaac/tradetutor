"""add username to users

Revision ID: c2f6e8a1d9c1
Revises: b0eda9851a54
Create Date: 2026-02-09 00:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c2f6e8a1d9c1'
down_revision = 'b0eda9851a54'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=50), nullable=True))
        batch_op.create_index(batch_op.f('ix_users_username'), ['username'], unique=True)


def downgrade():
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_users_username'))
        batch_op.drop_column('username')
