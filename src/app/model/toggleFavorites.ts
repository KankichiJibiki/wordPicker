export interface ToggleFavorite{
    id?: number | null,
    userId: number,
    wordId: number,
    isFav: boolean,
}