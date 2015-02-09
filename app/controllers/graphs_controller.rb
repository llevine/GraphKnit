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
    @graph = Graph.find(params[:id])
    @colors = Color.all
    puts "************* EDIT **************"
    render :new
  end

  def edit_info
    @graph = Graph.find(params[:id])
  end

  def new
    @colors = Color.all
    @graph = Graph.new
  end

  def create
    g = Graph.create(graph_params)
    g.update(user_id: current_user.id)
    render json: g
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
    render json: {success: true}
  end

  private

  def graph_params
    params.require(:graph).permit(:user_id, :name, :category, :image_url, :product_image, :layout, :notes, :privacy, :preview)
  end
end