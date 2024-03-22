import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse
import ast
from flask import Flask,render_template,request,redirect
import pickle
import pyodbc
import random
import requests
import bs4
from bs4 import BeautifulSoup
import math
from flask_cors import CORS
import os
class CF(object):
    """docstring for CF"""
    def __init__(self, Y_data, k, dist_func = cosine_similarity, uuCF = 1):
        self.uuCF = uuCF # user-user (1) or item-item (0) CF
        self.Y_data = Y_data if uuCF else Y_data[:, [1, 0, 2]]
        print('self.Y_data',self.Y_data)
        self.k = k
        self.dist_func = dist_func # đánh giá độ tương quan giữ 2 user
        self.Ybar_data = None # bản sao của ydata
        # number of users and items. Remember to add 1 since id starts from 0
        self.n_users = int(np.max(self.Y_data[:, 0])) + 1 # số lượng User
        self.n_items = int(np.max(self.Y_data[:, 1])) + 1 # số lượng Item
    def add(self, new_data):
        """
        Update Y_data matrix when new ratings come.
        For simplicity, suppose that there is no new user or item.
        """
        self.Y_data = np.concatenate((self.Y_data, new_data), axis = 0)

    def normalize_Y(self):
        users = self.Y_data[:, 0] # all users - first col of the Y_data
        self.Ybar_data = self.Y_data.copy()
        self.mu = np.zeros((self.n_users,)) # lưu giá trị trung bình theo Item hoặc user

        for n in range(self.n_users):
            # row indices of rating done by user n
            # since indices need to be integers, we need to convert
            ids = np.where(users == n)[0].astype(np.int32)
            # indices of all ratings associated with user n
            item_ids = self.Y_data[ids, 1]
            # and the corresponding ratings
            ratings = self.Y_data[ids, 2]
            # take mean
            m = np.mean(ratings)
            if np.isnan(m):
                m = 0 # to avoid empty array and nan value
            self.mu[n] = m
            # normalize
            self.Ybar_data[ids, 2] = ratings - self.mu[n]
        ################################################
        # form the rating matrix as a sparse matrix. Sparsity is important
        # for both memory and computing efficiency. For example, if #user = 1M,
        # #item = 100k, then shape of the rating matrix would be (100k, 1M),
        # you may not have enough memory to store this. Then, instead, we store
        # nonzeros only, and, of course, their locations.
        self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
            (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users))

        self.Ybar = self.Ybar.tocsr()

    def similarity(self):
        eps = 1e-6
        print('Ybar_T = np.transpose(Ybar)',np.transpose(self.Ybar))
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)


    def refresh(self):
        """
        Normalize data and calculate similarity matrix again (after
        some few ratings added)
        """
        self.normalize_Y()
        self.similarity()

    def fit(self):
        self.refresh()


    def __pred(self, u, i, normalized = 1):
        """
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        # Step 1: find all users who rated i
        ids = np.where(self.Y_data[:, 1] == i)[0].astype(np.int32) # vi tri user danh gia item
        # Step 2:
        users_rated_i = (self.Y_data[ids, 0]).astype(np.int32)

        # Step 3: find similarity btw the current user and others
        # who already rated i
        sim = self.S[u, users_rated_i] # matran similarity
        # Step 4: find the k most similarity users
        a = np.argsort(sim)[-self.k:]
        # and the corresponding similarity levels
        nearest_s = sim[a]
        # How did each of 'near' users rated item i
        r = self.Ybar[i, users_rated_i[a]]
        if normalized:
            # add a small number, for instance, 1e-8, to avoid dividing by 0
            Z = (r*nearest_s)[0]/(np.abs(nearest_s).sum() + 1e-8)
            return Z
        Z = (r*nearest_s)[0]/(np.abs(nearest_s).sum() + 1e-8) + self.mu[u]
        return Z

    def pred(self, u, i, normalized = 1):
        """
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        if self.uuCF: return self.__pred(u, i, normalized)
        return self.__pred(i, u, normalized)


    def recommend(self, u):
        print('co vao day')
        """
        Determine all items should be recommended for user u.
        The decision is made based on all i such that:
        self.pred(u, i) > 0. Suppose we are considering items which
        have not been rated by u yet.
        """
        ids = np.where(self.Y_data[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()
        recommended_items = []
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.__pred(u, i)
                if rating > 0:
                    recommended_items.append(i)
        return recommended_items

import joblib
loaded_model = joblib.load('model2.pkl')
app = Flask(__name__)

CORS(app, supports_credentials=True)

@app.route("/recommend")
def member():
    memberId = request.args.get('id')
    id = int(memberId)
    Id_rcm = loaded_model.recommend(id)
    return Id_rcm

@app.route("/")
def getMovie():
    return [1,2,3,5,4,6]

if __name__ == "__main__":
    app.run(debug=True)