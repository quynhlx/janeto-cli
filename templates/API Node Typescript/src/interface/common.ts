export interface IPagedEntities<T> {
    page: number;
    pageSize: number;
    totalSize: number
    pages: number;
    numberSkipped: number;
    nextPage?: number;
    priorPage?: number;
    firstPage: number;
    lastPage: number;
    onFirstPage: boolean;
    onLastPage: boolean;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    entities: T[];
}


export class PagedEntities<T> implements IPagedEntities<T> {
    get pages(): number {
        return Number.parseInt((this.totalSize / this.pageSize).toFixed(0));
    }
    get numberSkipped(): number {
        return this.pageSize * this.page;
    }
    nextPage?: number;
    priorPage?: number;
    get firstPage(): number {
        return 1;
    };
    get lastPage(): number {
        return Number.parseInt((this.totalSize / this.pageSize).toFixed(0));
    };
    get onFirstPage(): boolean {
        return this.page === 0;
    };
    get onLastPage(): boolean {
        return this.page === this.lastPage;
    };
    get hasNextPage(): boolean {
        return this.page < this.lastPage;
    };
    get hasPreviousPage(): boolean {
        return this.page > this.lastPage;
    };
    constructor(public page: number, public pageSize: number, public totalSize: number, public entities: T[]) {
        this.nextPage =  this.hasNextPage? this.page + 1: this.lastPage;
        this.priorPage = this.hasPreviousPage? this.page - 1 : this.firstPage;
    }

}