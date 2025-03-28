import { createContext, useState } from "react";

export const GlobalContext = createContext(null)

function GlobalContextProvider({children}) {
    const [services, setServices] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [selectedService, setSelectedService] = useState("");     
    const [steps, setSteps] = useState(3);
    const [selectedTree, setSelectedTree] = useState("");
    const [selectedHeight, setSelectedHeight] = useState(""); //in order to render different form for bushes and trees
    const [hideHeightForm, setHideHeightForm] =useState(false);
    const [count, setCount] = useState(0);
    const [treeTypeVisible, setTreeTypeVisible] = useState(false);
    const [photoInfoVisible, setPhotoInfoVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    const store = {
        selectedService,
        setSelectedService,
        services, 
        setServices,
        steps, 
        setSteps, 
        selectedTree, 
        setSelectedTree,
        selectedHeight, 
        setSelectedHeight,
        servicesData, 
        setServicesData,
        count, 
        setCount,
        hideHeightForm, 
        setHideHeightForm,
        treeTypeVisible,
        setTreeTypeVisible,
        photoInfoVisible,
        setPhotoInfoVisible,
        isModalOpen,
        setIsModalOpen,
        selectedPhoto, 
        setSelectedPhoto,
        isPhotoModalOpen, 
        setIsPhotoModalOpen
    }

    return (
        <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
    )
}

export default GlobalContextProvider;