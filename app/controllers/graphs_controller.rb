class GraphsController < ApplicationController
  def index
    render json: Graph.all
  end

  def read
    render json: Graph.find(params[:id])
  end

  def new
    @colors = Color.all
    # render json: Color.all
    @graph = Graph.new
  end

  def create
    render json: Graph.create(graph_params)
  end

  # def edit
  #   # check to see if this section is correct
  #   g = Graph.find(params[:id])
  #   g.update(graph_params)
  #   render json: g
  # end

  def update
    render json: Graph.update(params[:id], graph_params)
  end

  def destroy
    render json: Graph.destroy(params[:id])
  end

  private

  def graph_params
    params.require(:graph).permit(:name, :category, :image_url, :product_image, :layout, :notes, :privacy)
  end
end