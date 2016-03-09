require_relative ('board')

class Game
  def initialize
    @board = Board.new
  end

  def play


  end

  def won?

  end

  def take_turn

  end

end

game = Game.new()


class Board

  def initialize
    @grid = Array.new(4) { Array.new(4) }
  end

  def [](i, j)
    @grid[i][j]
  end

  def []= (i, j, val)
    @grid[i][j] = val
  end

  
end
