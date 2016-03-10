class StaticPagesController < ApplicationController
  def root
    if current_user
      @current_user_id = current_user.id
      @current_access_token = current_user.access_token
    else
      @current_user_id = -1
      @current_access_token = -1
    end
  end
end
