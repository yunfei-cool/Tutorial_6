import React, { Component } from 'react'
import { StyleSheet, Text, View, Button,TextInput } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


const issueDelete = gql`mutation issueDelete($issue: Issue_2!) { 
    issueDelete(issue: $issue) {
    id
    }
}`

export class RemoveCustomer extends Component {
    state = {
      name:'',
    }
    render(){
        return (
            <View style={styles.container}>
              <Mutation mutation={issueDelete}>
              {(issueDeleterMutation, { data }) => (
              <View>
              <Text style={{textAlign: 'center'}}>Enter the name of customer you want to delete</Text>
              <TextInput
                onChangeText={(value) => this.setState({ name: value })}
                style={styles.input} />
                <Button title="Remove" onPress={() => {
                  const issue = {
                    name: this.state.name
                  }
          issueDeleterMutation({
                      variables: {
                        issue:issue
                      },
                    })
                      .then((res) => res)
                      .catch((err) => <Text>{err}</Text>)
                    this.setState({ name: '' })
                  }}
                />
              </View>
            )}
          </Mutation>
        </View>
      
    )
  }
}

           
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    marginBottom: 0,
    paddingLeft: 10
  }
})

