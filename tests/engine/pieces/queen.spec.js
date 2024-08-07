import Queen from '../../../src/engine/pieces/queen';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';

describe('Queen', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move laterally and diagonally',  () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(0, 4), queen);

        const moves = queen.getAvailableMoves(board);

        const expectedMoves = [
            // Horizontal
            Square.at(0, 0), Square.at(0, 1), Square.at(0, 2), Square.at(0, 3), Square.at(0, 5), Square.at(0, 6), Square.at(0, 7),
            // Vertical
            Square.at(1, 4), Square.at(2, 4), Square.at(3, 4), Square.at(4, 4), Square.at(5, 4), Square.at(6, 4), Square.at(7, 4),
            // Forward diagonal
            Square.at(1, 5), Square.at(2, 6), Square.at(3, 7),
            // Backward diagonal
            Square.at(1, 3), Square.at(2, 2), Square.at(3, 1), Square.at(4, 0)
        ];

        moves.should.deep.include.members(expectedMoves);
    })

    it('cannot make any other moves', () => {
        const queen = new Queen(Player.WHITE);
        board.setPiece(Square.at(0, 4), queen);

        const moves = queen.getAvailableMoves(board);

        moves.should.have.length(21);
    })

    it('cannot move through friendly pieces', () => {
        const queen = new  Queen(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), friendlyPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('cannot move through opposing pieces', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 6), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 7));
    });

    it('cannot move through opposing pieces at the left', () => {
        const queen = new Queen(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), queen);
        board.setPiece(Square.at(4, 3), opposingPiece);

        const moves = queen.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 2));
    });

});
