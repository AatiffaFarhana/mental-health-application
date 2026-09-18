

const express = require("express");
const router = express.Router();

const MentalHealthResource = require("../models/MentalHealthResources");

// --------------------------------------------------
// GET ALL VERIFIED TAMIL NADU RESOURCES
// GET /api/resources/state
// --------------------------------------------------

router.get("/state", async (req, res) => {
    try {
        console.log(
            "Loading verified Tamil Nadu mental-health resources..."
        );

        const resources = await MentalHealthResource.find({
            verified: true,
            state: "Tamil Nadu"
        })
            .sort({
                district: 1,
                name: 1
            })
            .lean();

        console.log(
            `Verified Tamil Nadu resources found: ${resources.length}`
        );

        res.json(resources);

    } catch (error) {
        console.error(
            "Tamil Nadu resource route error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch verified Tamil Nadu mental-health resources."
        });
    }
});

// --------------------------------------------------
// GET VERIFIED RESOURCES BY DISTRICT
// GET /api/resources?district=Madurai
// --------------------------------------------------
router.get("/", async (req, res) => {
    try {
        const { district } = req.query;

        if (!district) {
            return res.status(400).json({
                message: "Tamil Nadu district is required."
            });
        }

        // --------------------------------------------
        // NORMALIZE DISTRICT NAME
        // --------------------------------------------

        const normalizedDistrict = district
            .toLowerCase()
            .trim()
            .replace(/\s+district$/i, "")
            .replace(/\s+/g, " ");

        console.log(
            "Requested district:",
            district
        );

        console.log(
            "Normalized district:",
            normalizedDistrict
        );

        // --------------------------------------------
        // GET VERIFIED TAMIL NADU RESOURCES
        // --------------------------------------------

        const resources =
            await MentalHealthResource.find({
                verified: true,
                state: "Tamil Nadu"
            })
            .sort({
                name: 1
            })
            .lean();

        // --------------------------------------------
        // FILTER DISTRICT IN JAVASCRIPT
        // --------------------------------------------

        const filteredResources =
            resources.filter((resource) => {

                const resourceDistrict =
                    (resource.district || "")
                        .toLowerCase()
                        .trim()
                        .replace(/\s+district$/i, "")
                        .replace(/\s+/g, " ");

                // Handle known spelling variation
                const normalizedResourceDistrict =
                    resourceDistrict === "pudukottai"
                        ? "pudukkottai"
                        : resourceDistrict;

                const normalizedRequestedDistrict =
                    normalizedDistrict === "pudukottai"
                        ? "pudukkottai"
                        : normalizedDistrict;

                return (
                    normalizedResourceDistrict ===
                    normalizedRequestedDistrict
                );
            });

        console.log(
            `Verified resources found for ${district}:`,
            filteredResources.length
        );

        res.json(filteredResources);

    } catch (error) {

        console.error(
            "Mental-health resource route error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch verified mental-health resources."
        });
    }
});

module.exports = router;