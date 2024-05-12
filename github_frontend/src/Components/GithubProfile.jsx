import Repo from "./Repo";

const GithubProfile = (props) => {
    const { repos } = props;
    // console.log('repos: ', repos);


    return (
        <>
            <div className="repDiv">
                <div className="leftSide">

                    <div className="imageDiv">
                        <img src={repos?.githubUser?.avatar_url} alt="userImage" className="image" />
                    </div>

                    <div className="leftContent">
                        <p><b>Username: &nbsp;</b>{repos?.githubUser?.username}</p>
                        <p><b>Name: &nbsp;</b>{repos?.githubUser?.name || "-"}</p>
                        <p><b>Bio: &nbsp;</b>{repos?.githubUser?.bio || "-"}</p>
                        <p><b>Total public repos: &nbsp;</b>{repos?.githubUser?.public_repos || "0"}</p>
                        <p><b>Followers: &nbsp;</b>{repos?.githubUser?.followers || "0"}</p>
                        <p><b>Following: &nbsp;</b>{repos?.githubUser?.following || "0"}</p>
                    </div>

                </div>
                <div className="rightSide">
                    <div className="rightContent">
                        {
                            repos?.githubRepos?.map((repo) => <Repo key={repo?.id} id={repo?.id} name={repo?.name} description={repo?.description} watchers_count={repo?.watchers_count} is_star={repo?.is_star} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default GithubProfile