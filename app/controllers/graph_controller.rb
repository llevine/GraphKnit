class GraphController < ApplicationController
  def index
    render json: Graph.all
  end

  def show
    render json: Graph.find(params[:id])
  end

  def new
    @user = Graph.new
  end

  def create
    render json: Graph.create(graph_params)
  end

  def edit
    # check to see if this section is correct
    if current_user
      render json: Graph.find(params[:id])
    end
  end

  def update
    render json: Graph.update(params[:id], graph_params)
  end

  def destroy
    render json: Graph.destroy(params[:id])
  end

  private

  def graph_params
    params.require(:graph).permit(:name, :category, :image_url, :difficulty, :gauge, :rows, :columns, :number_of_colors, :layout, :notes)
  end
end