"use client";

import { FaTree, FaTrophy, FaDownload } from "react-icons/fa";

type CertificateType = "tree" | "sports";

interface CertificateProps {
  type: CertificateType;
  name: string;
  title: string;
  date: string;
  certificateId: string;
  organization: string;
}

const CertificateCard = ({
  type,
  name,
  title,
  date,
  certificateId,
  organization,
}: CertificateProps) => {
  const isTree = type === "tree";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
      {/* Header */}
      <div className="text-center mb-4">
        {isTree ? (
          <FaTree className="mx-auto text-green-600 text-4xl mb-2" />
        ) : (
          <FaTrophy className="mx-auto text-yellow-500 text-4xl mb-2" />
        )}

        <h2 className="text-xl font-bold text-gray-800">
          {isTree ? "Tree Plantation Certificate" : "Sports Achievement Certificate"}
        </h2>

        <p className="text-gray-500 text-sm">
          {isTree
            ? "Thank you for making the earth greener 🌍"
            : "Celebrating your sports excellence 🏆"}
        </p>
      </div>

      {/* Certificate Body */}
      <div
        className={`border-4 rounded-xl p-5 relative ${
          isTree ? "border-green-600 bg-green-50" : "border-yellow-500 bg-yellow-50"
        }`}
      >
        <div className="absolute top-3 right-3 text-xs text-gray-500">
          ID: {certificateId}
        </div>

        <p className="text-center text-gray-600 text-sm mb-2">
          This certificate is proudly presented to
        </p>

        <h3
          className={`text-center text-xl font-bold mb-3 ${
            isTree ? "text-green-700" : "text-yellow-600"
          }`}
        >
          {name}
        </h3>

        <p className="text-center text-gray-600 text-sm">
          {isTree ? "for successfully planting" : "for outstanding performance in"}
        </p>

        <h4 className="text-center font-semibold text-gray-800 mt-2">
          {isTree ? "🌱" : "🏆"} {title}
        </h4>

        <p className="text-center text-gray-600 text-sm mt-3">
          on <strong>{date}</strong>
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <div>
            <p className="text-gray-500">Authorized By</p>
            <p className="font-semibold text-gray-700">{organization}</p>
          </div>

          <div className="text-right">
            <p className="text-gray-500">Signature</p>
            <p className="font-semibold text-gray-700">
              {isTree ? "🌿 Eco Team" : "🏅 Sports Committee"}
            </p>
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => alert("Download started")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isTree
              ? "bg-green-600 hover:bg-green-700"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          <FaDownload />
          Download
        </button>
      </div>
    </div>
  );
};

export default function Certificate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Certificate Demo
      </h1>

      {/* Certificates Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tree Certificate */}
        <CertificateCard
          type="tree"
          name="Krishna Soni"
          title="Neem Tree Plantation"
          date="10 January 2026"
          certificateId="TREE-2026-001"
          organization="Green Earth Org"
        />

        {/* Sports Certificate */}
        <CertificateCard
          type="sports"
          name="Krishna Soni"
          title="Inter College Sports Championship"
          date="15 January 2026"
          certificateId="SPORTS-2026-009"
          organization="Sports Authority of India"
        />
      </div>
    </div>
  );
}
