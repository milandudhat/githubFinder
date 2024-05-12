import React, { useContext, useEffect } from 'react'
import alertContext from '../Context/alerts/alertContext';
import githubContext from '../Context/github/githubContext';
import GithubProfile from './GithubProfile';


const HomePage = () => {

    const gContext = useContext(githubContext);
    const { search, setSearch, lodder, setLodder, repos, setRepos, getGithubRepos } = gContext;

    const context = useContext(alertContext);
    const { showAlert } = context;

    useEffect(() => {
        if (search.trim() !== "") {
            getRepoListFunc();
        }
    }, []);

    const searchHandler = async (e) => {
        e.preventDefault();

        if (search.trim() !== "") {
            getRepoListFunc();
        }
    }

    const getRepoListFunc = async () => {
        const response = await getGithubRepos(search.trim());
        // const response = ressss
        if (response.success) {
            setLodder(false);
            setRepos(response?.data);
        } else {
            if(response.status === 403){
                showAlert("danger", "Github API rate limit exceeded. Please wait and try again later.", 3000);
                setLodder("");
            } else{
                showAlert("danger", "Github user not exists", 3000);
                setLodder("");
            }
        }
    }

    return (
        <>
            <div className="main ">
                <div className="home"></div>
                <h1 className="title">Find a Github User's Profile and Repositories</h1>
                <p className="subTitle">by entering a github username <b>( To use a bookmark feature, you must be logged in )</b></p>

                <form className="searchDiv" onSubmit={(e) => searchHandler(e)}>
                    <input placeholder='Type here...' className="formInput" type="text" id="password" name="password" required onChange={(e) => setSearch(e.target.value)} />
                    <div className="btnContainer">
                        <button type="submit" disabled={search.length < 1 || search.trim() === ""} className="btn searchBtn" ><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>

                {
                    lodder === true && <div className="loader"></div>
                }
                {
                    lodder === false && <GithubProfile repos={repos} />
                }

                <p></p>
            </div>
        </>
    )
}

// const GithubProfile = (props) => {
//     const { res } = props;
//     console.log('res: ', res);
//     return (
//         <>
//             <div className="repDiv">
//                 <div className="leftSide">

//                     <div className="imageDiv">
//                         <img src={res?.githubUser?.avatar_url} alt="userImage" className="image" />
//                     </div>

//                     <div className="leftContent">
//                         <p><b>Username: &nbsp;</b>{res?.githubUser?.username}</p>
//                         <p><b>Name: &nbsp;</b>{res?.githubUser?.name || "-"}</p>
//                         <p><b>Bio: &nbsp;</b>{res?.githubUser?.bio || "-"}</p>
//                         <p><b>Total public repos: &nbsp;</b>{res?.githubUser?.public_repos || "0"}</p>
//                         <p><b>Followers: &nbsp;</b>{res?.githubUser?.followers || "0"}</p>
//                         <p><b>Following: &nbsp;</b>{res?.githubUser?.following || "0"}</p>
//                     </div>

//                 </div>
//                 <div className="rightSide">
//                     <div className="rightContent">
//                         {
//                             res?.githubRepos?.map((repo) => <RepoDiv key={repo?.id} id={repo?.id} name={repo?.name} description={repo?.description} watchers_count={repo?.watchers_count} is_star={repo?.is_star} />)
//                         }
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// const RepoDiv = (props) => {

//     const handleBookmark = () => {
//         console.log('props: ', props.id);


//     }

//     return (
//         <>
//             <div className="repo">
//                 <p className="repoName">{props?.name || ""}</p>
//                 {props.description && <p>{props?.description}</p>}
//                 <p>Number of Watchers: {props?.watchers_count || 0}</p>
//                 <span className="star">
//                     {
//                         props?.is_star === true ? <i className="fa-solid fa-star" onClick={handleBookmark}></i> : <i className="fa-regular fa-star" onClick={handleBookmark}></i>
//                     }
//                 </span>
//             </div>
//         </>
//     )
// }

export default HomePage