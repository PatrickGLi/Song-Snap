class StaticPagesController < ApplicationController
  def root
    @current_user_access_token = current_user ? current_user.access_token : -1
  end
end
