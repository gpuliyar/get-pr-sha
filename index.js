const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
    try {
        const repository = core.getInput('repository', { required: true });
        const prNumber = core.getInput('pr-number', { required: true });
        const token = process.env['GITHUB_TOKEN'];
        const octokit = new github.getOctokit(token);

        const { data: pullRequest } = await octokit.rest.pulls.get({
            owner: repository.split('/')[0],
            repo: repository.split('/')[1],
            pull_number: prNumber
        });

        const sha = pullRequest.head.sha;
        core.setOutput('sha', sha);
    } catch (error) {
        core.setFailed(`Action failed with error ${error.message}`);
    }
}

main();
