import { Document, Model } from "mongoose";

export class RepositoryBase<T extends Document> {
    private model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this.model = schemaModel;
    }

    public create(item: T): Promise<T> {
        return this.model.create(item);
    }

    public count(query: object): Promise<number> {
        return this.model.count(query).then((count) => count);
    }

    public findById(id: string): Promise<T | null> {
        return this.model.findById(id).then((res) => res );
    }

    public find(query: object, options?: object): Promise<T[]> {
        return this.model.find(query, null, options).exec().then((res) => res);
    }

    public findOne(condition: object): Promise<T | null> {
        return this.model.findOne(condition).then((res) => res);
    }

    public updateById(id: string, modifier: object): Promise<boolean> {
        return this.model.findByIdAndUpdate(id, modifier)
            .then((res) => true)
            .catch((err) => false);
    }

    public deleteById(id: string): Promise<boolean> {
        return this.model.findByIdAndRemove(id)
            .then((res) => true)
            .catch((err) => false);
    }
}
