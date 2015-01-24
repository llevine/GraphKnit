class GraphsController < ApplicationController
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
    puts "******** name: #{graph_params[:name]}"
    puts "******** category: #{graph_params[:category]}"
    puts "******** layout: #{graph_params[:layout]}"
    puts "******** keys: #{graph_params.keys}"
    g = Graph.create(graph_params)
    puts "**************** #{g.errors.messages}"
    render json: g
  end

  # def edit
  #   # check to see if this section is correct
  #   g = Graph.find(params[:id])
  #   g.update(graph_params)
  #   render json: g
  # end

  def update
    render json: Graph.update(params[:id], graph_params[:graph])
  end

  def destroy
    render json: Graph.destroy(params[:id])
  end

  private

  def graph_params
    puts "********* ACTUAL PARAMS: #{params[:graph]}"
    params[:graph][:layout] = params[:graph][:layout].flatten.join(",")
    params.require(:graph).permit(:name, :category, :image_url, :product_image, :layout, :notes, :privacy)
  end
end