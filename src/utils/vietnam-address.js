import {
  getAllProvince,
  getDistrictsByProvinceId,
  getCommunesByDistrictId,
  searchProvinceByName,
  searchDistrictByName,
  searchCommuneByName
} from 'vietnam-provinces-js';

export const getProvinceOptions = async () => {
  try {
    const provinces = await getAllProvince();
    return provinces.map((province) => ({
      value: province.idProvince,
      label: province.name,
      code: province.codename
    }));
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

export const getDistrictOptions = async (provinceId) => {
  try {
    const districts = await getDistrictsByProvinceId(provinceId);
    return districts.map((district) => ({
      value: district.idDistrict,
      label: district.name,
      code: district.codename,
      provinceId: district.idProvince
    }));
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
};

export const getCommuneOptions = async (districtId) => {
  try {
    const communes = await getCommunesByDistrictId(districtId);
    return communes.map((commune) => ({
      value: commune.idCommune,
      label: commune.name,
      code: commune.codename,
      districtId: commune.idDistrict
    }));
  } catch (error) {
    console.error('Error fetching communes:', error);
    return [];
  }
};

export const searchProvince = async (query) => {
  try {
    return await searchProvinceByName(query);
  } catch (error) {
    console.error('Error searching provinces:', error);
    return [];
  }
};

export const searchDistrict = async (query) => {
  try {
    return await searchDistrictByName(query);
  } catch (error) {
    console.error('Error searching districts:', error);
    return [];
  }
};

export const searchCommune = async (query) => {
  try {
    return await searchCommuneByName(query);
  } catch (error) {
    console.error('Error searching communes:', error);
    return [];
  }
};
