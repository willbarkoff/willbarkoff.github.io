/*
 * Compiled and edited from https://github.com/azu/parse-github-event
 * Thanks for opensourcing your code! License included below:
 * Copyright (c) 2014 azu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function parseGithubData(event) {
    var GITHUB_DOMAIN = "https://github.com";
    var repo = event.repo.name;
    var login = event.actor.login;
    switch (event.type) {
        case 'CreateEvent':
            switch (event.payload.ref_type) {
                case 'repository':
                    return {
                        login: login,
                        text: "created repo " + repo,
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
                case 'tag':
                    return {
                        login: login,
                        text: "created tag " + event.payload.ref_type + " at " + repo,
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/releases/tag/" + event.payload.ref
                    };
                case 'branch':
                    return {
                        login: login,
                        text: "created branch " + event.payload.ref_type + " at " + repo,
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/tree/" + event.payload.ref
                    };
            }
            break;
        case 'MemberEvent':
            switch (event.payload.action) {
                case 'added':
                    return {
                        login: login,
                        text: "added " + event.payload.member + " to " + repo,
                        data: {
                            member: event.payload.member,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + event.payload.member.login
                    };
            }
            break;
        case 'PushEvent':
            var branch = event.payload.ref.substr(event.payload.ref.lastIndexOf('/') + 1);
            return {
                login: login,
                text: "pushed to " + branch + " at " + repo,
                data: {
                    branch: branch,
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo + "/compare/" + event.payload.before + "..." + event.payload.head
            };
        case 'ForkApplyEvent':
            return {
                login: login,
                text: "merged to " + repo,
                data: {
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo + "/compare/" + event.payload.before + "..." + event.payload.head
            };
        case 'ForkEvent':
            return {
                login: login,
                text: "forked " + repo,
                data: {
                    repository: repo
                },
                html_url: event.payload.forkee.html_url
            };
        // https://developer.github.com/v3/activity/events/types/#watchevent
        case 'WatchEvent':
            switch (event.payload.action) {
                case 'started':
                    return {
                        login: login,
                        text: "starred " + repo,
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
            }
            break;
        case 'FollowEvent':
            return {
                login: login,
                text: "followed " + event.payload.target.login,
                data: {
                    login: event.payload.target.login,
                    name: event.payload.target.name
                },
                html_url: GITHUB_DOMAIN + "/" + event.payload.target.login
            };
        case 'IssuesEvent':
        case 'PullRequestEvent':
            var payloadObject = (event.payload.pull_request || event.payload.issue);
            switch (event.payload.action) {
                case 'opened':
                case 'reopened':
                    return {
                        login: login,
                        text: "opened issue on " + repo + "#" + payloadObject.number,
                        data: {
                            repository: repo,
                            number: payloadObject.number
                        },
                        html_url: payloadObject.html_url
                    };
                case 'closed':
                    return {
                        login: login,
                        text: "closed issue on" + repo + "#" + payloadObject.number,
                        data: {
                            repository: repo,
                            number: payloadObject.number
                        },
                        html_url: payloadObject.html_url
                    };
            }
            break;
        case 'GistEvent':
            switch (event.payload.action) {
                case 'create':
                    return {
                        login: login,
                        text: "created gist:" + event.payload.gist.id,
                        data: {
                            id: event.payload.gist.id
                        },
                        html_url: event.payload.gist.html_url
                    };
                case 'update':
                    return {
                        login: login,
                        text: "updated gist:" + event.payload.gist.id,
                        data: {
                            id: event.payload.gist.id
                        },
                        html_url: event.payload.gist.html_url
                    };
                case 'fork':
                    return {
                        login: login,
                        text: "forked gist:" + event.payload.gist.id,
                        data: {
                            id: event.payload.gist.id
                        },
                        html_url: event.payload.gist.html_url
                    };
            }
            break;
        case 'GollumEvent':
            if (event.payload.pages.some(function (page) {
                return page.action === "created";
            })) {
                return {
                    login: login,
                    text: "created a wiki page on " + repo,
                    data: {
                        repository: repo
                    },
                    html_url: event.payload.pages[0].html_url
                };
            }
            else {
                return {
                    login: login,
                    text: "edited a wiki page on " + repo,
                    data: {
                        repository: repo
                    },
                    // https://github.com/Constellation/escodegen/wiki/_compare/8071c6feb719b3c9e1742620aab9c1bbfda80e70...a567b1a221885a9ae5c576561e18ce68909624b6
                    html_url: GITHUB_DOMAIN + "/" + repo +
                        "/wiki/_compare/" + event.payload.pages[0].sha + "..." + event.payload.pages[event.payload.pages.length - 1].sha
                };
            }
        case 'CommitCommentEvent':
            return {
                login: login,
                text: "commented on " + repo,
                data: {
                    repository: repo
                },
                html_url: event.payload.comment.html_url
            };
        case 'PullRequestReviewCommentEvent':
            return {
                login: login,
                text: "commented on " + repo,
                data: {
                    repository: repo
                },
                html_url: event.payload.comment.html_url
            };
        case 'IssueCommentEvent':
            return {
                login: login,
                text: "commented on " + repo + "#" + (event.payload.pull_request || event.payload.issue).number,
                data: {
                    repository: repo,
                    number: (event.payload.pull_request || event.payload.issue).number
                },
                html_url: event.payload.comment.html_url
            };
        case 'DeleteEvent':
            switch (event.payload.ref_type) {
                case 'branch':
                    return {
                        login: login,
                        text: "deleted branch " + event.payload.ref + " at " + repo,
                        data: {
                            ref: event.payload.ref,
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
            }
            break;
        case 'PublicEvent':
            return {
                login: login,
                text: "open sourced " + repo,
                data: {
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo
            };
        case 'DownloadEvent':
            return {
                login: login,
                text: "created download " + event.payload.download.name,
                data: {
                    name: event.payload.download.name
                },
                html_url: event.payload.download.html_url
            };
        case 'ReleaseEvent':
            return {
                login: login,
                text: "created tag " + event.payload.release.tag_name+ " at " + repo,
                data: {
                    tag_name: event.payload.release.tag_name,
                    repository: repo
                },
                html_url: event.payload.release.html_url
            };
    }
    console.warn('Event:' + event.type, event);
    return;
}
