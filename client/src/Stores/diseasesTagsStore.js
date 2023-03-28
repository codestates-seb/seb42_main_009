import { create } from 'zustand';

const useDiseasesTagsStore = create(set => ({
  diseasesTags: [],
  setDiseasesTags: state => set(() => ({ diseasesTags: state })),
}));

export { useDiseasesTagsStore };
