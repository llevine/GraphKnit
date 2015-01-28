class GraphsController < ApplicationController
  def index
    @graphs = Graph.all
  end

  def show
    @graph = Graph.find(params[:id])
  end

  def read
    render json: Graph.find(params[:id])
  end

  def edit
    @colors = Color.all
    puts "************* EDIT **************"
    render :new
  end

  def new
    @colors = Color.all
    @graph = Graph.new
  end

  def create
    render json: Graph.create(graph_params)
  end

  def update
    render json: Graph.update(params[:id], graph_params)
  end

  def destroy
    @graph = Graph.find(params[:id])
    @graph.destroy
    # You can't do this because backbone is calling destroy,
    # and it must get a json as a response
    # redirect_to graphs_new_path
    render json: @graph
  end

  private

  def graph_params
    params.require(:graph).permit(:user_id, :name, :category, :image_url, :product_image, :layout, :notes, :privacy, :preview)
  end
end