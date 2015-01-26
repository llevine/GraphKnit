class UsersController < ApplicationController

	def show
		@user = User.find(params[:id])
		# @current_user = current_user
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		@user_id = session[:current_user_id]
		if @user.save
			session[:current_user_id] = @user.id
			redirect_to @user
		else
			render :new
		end
	end

	def destroy
		@user = User.find(params[:id])
		if @user != current_user
			redirect_to users_path
		else
			@user.destroy
			session[:current_user_id] = nil
			redirect_to graphs_path
		end
	end

	private

	def user_params
		params.require(:user).permit(:username, :first_name, :last_name, :email, :password, :password_confirmation)
	end
end