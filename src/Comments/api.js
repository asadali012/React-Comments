export const getComments = async () => {
    return [
        {
            id: "1",
            body: "First comment",
            username: "Ali",
            userId: "1",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "2",
            body: "Second comment",
            username: "Azmat",
            userId: "2",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "3",
            body: "First comment first child",
            username: "Azmat",
            userId: "2",
            parentId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "4",
            body: "Second comment second child",
            username: "Azmat",
            userId: "2",
            parentId: "2",
            createdAt: "2021-08-16T23:00:33.010",
        },
    ];
};

// export const createComment = async (text, parentId = null) => {
//     return {
//         id: Math.random().toString(36).substring(2, 9),
//         body: text,
//         parentId,
//         userId: "1",
//         username: "Ali",
//         createdAt: new Date().toISOString(),
//     };
// };

export const updateComment = async (text) => {
    return { text };
};

export const deleteComment = async () => {
    return {};
};