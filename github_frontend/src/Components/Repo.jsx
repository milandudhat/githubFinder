import { useContext } from "react";
import githubContext from "../Context/github/githubContext";
import alertContext from "../Context/alerts/alertContext";

const Repo = (props) => {
    // console.log('props: ', props);

    const context = useContext(alertContext);
    const { showAlert } = context;

    const gContext = useContext(githubContext);
    const { setLodder, setRepos, bookMarkUpdate, getGithubRepos, search } = gContext;

    const handleBookmark = async () => {
        // console.log('props: ', props);

        const token = localStorage.getItem("token");
        if (!token) {
            showAlert("danger", "To use a bookmark feature, you must be logged in", 3000);
            return;
        }

        const response = await bookMarkUpdate(props?.id);
        if (response.success) {
            if (search.trim() !== "") {
                // setLodder(false);
                const responseRepo = await getGithubRepos(search.trim());
                if (responseRepo.success) {
                    setLodder(false);
                    setRepos(responseRepo?.data);

                } else {
                    if (response.status === 403) {
                        showAlert("danger", "Github API rate limit exceeded. Please wait and try again later.", 3000);
                        setLodder("");
                    } else {
                        showAlert("danger", "Github user not exists", 3000);
                        setLodder("");
                    }
                }
            }
        }
    }

    return (
        <>
            <div className="repo">
                <p className="repoName">{props?.name || ""}</p>
                {props.description && <p>{props?.description}</p>}
                <p>Number of Watchers: {props?.watchers_count || 0}</p>
                <span className="star">
                    {
                        props?.is_star === true ? <i className="fa-solid fa-star" onClick={handleBookmark}></i> : <i className="fa-regular fa-star" onClick={handleBookmark}></i>
                    }
                </span>
            </div>
        </>
    )
}

export default Repo