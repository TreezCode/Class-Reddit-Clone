$(document).ready(function () {
    var createdAt = new Date();
    var dummyData = [{
            title: 'Funny Video!',
            link: 'https://www.youtube.com',
            votes: 32,
            user: 'Kyle',
            createdAt: createdAt
        },
        {
            title: 'Funny Video!',
            link: 'https://www.youtube.com',
            votes: 32,
            user: 'Kyle',
            createdAt: createdAt
        },
        {
            title: 'Funny Video!',
            link: 'https://www.youtube.com',
            votes: 32,
            user: 'Kyle',
            createdAt: createdAt
        }
    ];

    dummyData.forEach(function (item) {
        var $template = $('#content-template').clone();
        var newItem = $template.prop('content');

        $(newItem).find('.content-title').text(item.title);
        $(newItem).find('.votes').text(item.votes);
        $(newItem).find('.content-link').attr('href', item.link).attr('target', '_blank');
        $(newItem).find('.content-meta').text(item.user + ' posted at ' + item.createdAt);

        $('#list').append(newItem);

    });
});