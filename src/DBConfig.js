export const DBConfig = {
    name: 'ads_bo',
    version: 1,
    objectStoresMeta: [
        {
            store: 'sess',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'id',keypath:'id',options:{unique:false}},
                { name: 'token',keypath:'token',options:{unique:false}},
                { name: 'name',keypath:'name',options:{unique:false}},
                { name: 'username',keypath:'username',options:{unique:false}},
                { name: 'foto',keypath:'foto',options:{unique:false}},
                { name: 'level',keypath:'level',options:{unique:false}},
                { name: 'access_level',keypath:'access_level',options:{unique:false}},
                { name: 'status',keypath:'status',options:{unique:false}},
            ]
        },
    ]
};