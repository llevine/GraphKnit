class UserController < ApplicationController
	def index
		render json: User.all
	end

	def show
		render json: User.find(params[:id])
	end

	def new
		@user = User.new
	end

	def create
		render json: User.create(user_params)
	end

	def edit
		# check to see if this section is correct
		if current_user
			render json: User.find(params[:id])
		end
	end

	def update
		render json: User.update(params[:id], user_params)
	end

	def destroy
		render json: User.destroy(params[:id])
	end

	private

	def user_params
		params.require(:user).permit(:username, :first_name, :last_name, :email, :password_digest)
	end
end