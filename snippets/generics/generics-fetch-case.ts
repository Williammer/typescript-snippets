
/**
    In the last coding challenges, we created the function
    handleEntities(entities) that uses Type Guards to decide
    during runtime whether our entity is a User or Product.
    Accordingly, for a User the handleUser(user) function
    and for a Product the handleProduct(product) is executed.
    In this code exercise, we will eliminate the
    handleEntities(entities) function and our type guards.
    We don't need it anymore because we will adjust our
    fetchData(type) function to return the expected type of
    the return value directly. We can achieve this by
    using conditional types.
    Excercise:

    1. Create the conditional type ApiResponseTypeToEntity
    2. Make the fetchData function generic and use the
       conditional type ApiResponseTypeToEntity to return the corresponding ApiResponse

 */


interface Entity {
    id: string;
}

interface User extends Entity {
    name: string;
}

interface Product extends Entity {
    description: string;
}

const mockUsers: User[] = [
    { id: "1", name: 'Santa Claus' },
    { id: "2", name: 'Jon Doe' }
];
const mockProducts: Product[] = [
    { id: "1", description: 'Product 1' },
    { id: "2", description: 'Product 2' }
];


type ApiResponse<T extends Entity> =
    | { status: 'success'; data: T[]; }
    | { status: 'error'; error: string; };

async function fetchMock<T extends Entity>(mockData: T[]): Promise<ApiResponse<T>> {
    return new Promise(res => res({
        status: 'success',
        data: mockData
    }));
}

type ProductResponse = ApiResponse<Product>;

async function fetchProducts(): Promise<ProductResponse> {
    return fetchMock(mockProducts);
}

type UserResponse = ApiResponse<User>;

async function fetchUsers(): Promise<UserResponse> {
    return fetchMock(mockUsers);
}

type ApiResponseType = 'user' | 'product';

type ApiResponseTypeToEntity<Type extends ApiResponseType> =
    Type extends 'user' ? User :
    Type extends 'product' ? Product :
    never;

async function fetchData<Type extends ApiResponseType>(type: Type): Promise<ApiResponse<ApiResponseTypeToEntity<Type>>> {
    switch (type) {
        case 'user':
            return fetchUsers() as Promise<ApiResponse<ApiResponseTypeToEntity<Type>>>;
        case 'product':
            return fetchProducts() as Promise<ApiResponse<ApiResponseTypeToEntity<Type>>>;
        default:
            throw Error(`Could not fecth data of type '${type}'`);
    }
}


function handleUser(user: User) {
    console.log(`Successfully loaded user: ${user.name}`);
}

function handleProduct(product: Product) {
    console.log(`Successfully loaded product: ${product.description}`);
}

async function startApp() {
    const usersResponse = await fetchData('user');
    const productsResponse = await fetchData('product');

    if (!(usersResponse && productsResponse) || usersResponse.status === 'error' || productsResponse.status === 'error') {
        throw new Error('An error occured while fetching some data.')
    }


    console.log(`Successfully fetched ${usersResponse.data.length} users.`);
    console.log(`Successfully fetched ${productsResponse.data.length} products.`);

    usersResponse.data.forEach(user => handleUser(user));

    productsResponse.data.forEach(product => handleProduct(product));


}
