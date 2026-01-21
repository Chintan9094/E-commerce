import { Address } from "../models/address.model.js";

export const addAddress = async (req, res, next) => {
  try {
    const newAddress = await Address.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      address: newAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json({ success: true, addresses });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ success: true, message: "Address deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      address: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
};
