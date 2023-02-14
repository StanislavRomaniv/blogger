const BlogList = [
    {
        img: 'https://images.unsplash.com/photo-1556403806-90f55c9db1e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        title: 'Street food',
        author: 'Blogger',
        descr: 'ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimquis nostrud exercitation ullamco laboris',
        featured: false,
    },
    {
        img: 'https://images.unsplash.com/photo-1533850595620-7b1711221751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1245&q=80',
        title: 'Amazing Place',
        author: 'Blogger',
        descr: 'ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimquis nostrud exercitation ullamco laboris',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1148&q=80',
        title: 'AI in nowadays',
        author: 'Blogger',
        descr: 'ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimquis nostrud exercitation ullamco laboris',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1572852066354-b5bd0191261b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        title: 'Bikes in our life',
        author: 'Blogger',
        descr: 'ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimquis nostrud exercitation ullamco laboris',
        featured: false,
    },
];

export function getFeaturedEvents() {
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllBlogs() {
    return BlogList;
}

export function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    let filteredEvents = DUMMY_EVENTS.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}

export function getEventById(id) {
    return DUMMY_EVENTS.find((event) => event.id === id);
}
