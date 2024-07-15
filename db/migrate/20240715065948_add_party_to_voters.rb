class AddPartyToVoters < ActiveRecord::Migration[7.1]
  def change
    add_column :voters, :party, :string
  end
end
