import { useEffect } from "react";
import { useState } from "react";
import paperService from "../../../services/paper.service";
import { useNavigate } from "react-router-dom";

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();
  const { getAllPapers } = paperService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPapers("exam=A/L&type=Past&medium=English");
      setPapers(res.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaperClick = (paperId) => {
    navigate(`/paper/${paperId}`); // Use navigate to redirect to paper details
  };

  return (
    <div className="flex p-20 bg-white">
      <div className="flex flex-col max-w-screen-xl gap-16 mx-auto">
        <div className="flex w-full gap-10">
          {papers?.map((paper) => (
            <div
              key={paper.id}
              className="flex flex-col p-6 bg-gray-300"
              onClick={() => handlePaperClick(paper.id)}
            >
              {paper.year}
              {paper.medium}
              {paper.type}
              {paper.exam}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Papers;
