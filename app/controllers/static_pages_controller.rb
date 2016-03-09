class StaticPagesController < ApplicationController
  def root
    @current_user_id = current_user ? current_user.id : -1
  end
end
