const express = require("express");
const axios = require("axios");
const qs = require("qs");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
let token;

exports.getToken = async () => {
   const data = qs.stringify({ grant_type: "client_credentials" });
   const auth_token = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, "utf-8").toString("base64");

   const authOptions = {
      headers: {
         Authorization: `Basic ${auth_token}`,
         "Content-Type": "application/x-www-form-urlencoded",
      },
   };

   try {
      const response = await axios.post("https://accounts.spotify.com/api/token", data, authOptions);
      token = response.data.access_token;
   } catch (error) {
      return error;
   }
};

exports.startSearch = async (req, res) => {
   const artistParams = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   };

   const { search } = req.body;

   try {
      let allSongs = [];
      const getSongs = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=artist,album,track,playlist`, artistParams);
      const results = getSongs.data.tracks.items;

      results.forEach((track) => {
         if (track.preview_url) {
            const allTracks = {
               id: track.id,
               title: track.name,
               track: track.preview_url,
               artist_name: track.artists[0].name,
               album_img: track.album.images[0].url,
            };

            allSongs.push(allTracks);
         }
      });

      res.send(allSongs.slice(0, 9));
   } catch (err) {
      console.log("search", err);
      res.status(401).json(err);
   }
};
