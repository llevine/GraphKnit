class SessionsController < ApplicationController

	def new
	end

	def create
		@user = User.find_by(username: params[:username])
		if @user && @user.authenticate(params[:password])
			session[:current_user_id] = @user.id
			redirect_to new_graph_path
		else
			flash[:login_error] = "That username password combo does not match our records. Please try again, sign-up, or continue as guest."
			render :new
		end
	end

	def destroy
		session[:current_user_id] = nil
		flash[:logout] = "You have successfully logged out"
		redirect_to new_graph_path
	end
	
end
