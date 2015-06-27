module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/beagleknight-web',
            deployTo: '/home/david/web/',
            repositoryUrl: 'https://github.com/beagleknight/web.git',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            //key: '/path/to/key',
            shallowClone: true
        },
        production: {
            servers: 'david@beagleknight.com'
        }
    });

    shipit.task('pwd', function () {
        return shipit.remote('pwd');
    });
};
