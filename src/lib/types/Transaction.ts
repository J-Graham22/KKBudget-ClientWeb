export default interface Transaction {
    id: number,
    name: string,
    description: string,
    amount: number,
    date: string | Date,
    categories: string[],
    account: string,
}