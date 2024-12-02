export default function AddDonationForm({
    addDonation,
    handleDTitleChange,
    handleDCategoryChange,
    handleDConditionChange,
    handleDDescriptionChange,
    dTitle,
    dCategory,
    dCondition,
    dDescription
}) {

    return (
        <form onSubmit={addDonation}>
            <div className={formContainer}>
                <label className={formLabel}>Title</label>
                <input className={formInput} onChange={handleDTitleChange} value={dTitle} type="text"></input>
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Category</label>
                <input className={formInput} onChange={handleDCategoryChange} value={dCategory} type="text"></input>
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Condition</label>
                <input className={formInput} onChange={handleDConditionChange} value={dCondition} type="text"></input>
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Description</label>
                <input className={formInput} onChange={handleDDescriptionChange} value={dDescription} type="text"></input>
            </div>
            <div className="flex justify-center mt-6">
                <div className="flex justify-center w-48 h-10 border border-slate-500 bg-slate-800 text-emerald-400 rounded-3xl active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950">
                    <button className="w-30" type="submit">Submit Donation</button>
                </div>
            </div>
        </form>
    );
}

const formContainer = "m-2 flex flex-row justify-between items-center";
const formLabel = "text-slate-800 ";
const formInput = "border border-emerald-900 ml-3 h-8 p-2 rounded-md text-sm shadow-md hover:shadow-lg focus:shadow-3xl";